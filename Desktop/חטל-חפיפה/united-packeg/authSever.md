בוא נבדוק את המבנה הקיים של הפרויקט כדי לתת המלצה מדויקת:

[3 tools called]

מעולה! אני רואה שהפרויקט שלך משתמש ב**Feature-based architecture** (ארכיטקטורה מודולרית). 

בואו נבדוק עוד קצת:

[2 tools called]

# 🏗️ המלצה למבנה Auth בפרויקט שלך

אחרי שבדקתי את המבנה, אני רואה שיש לך **ארכיטקטורה מודולרית מצוינת**:

```
feature/
  ├── controllers/    (Express request/response handlers)
  ├── services/       (Business logic)
  ├── DAL/           (Data Access Layer)
  │   └── pg/        (PostgreSQL queries & tables)
  └── routes/        (Route definitions)
```

---

## ✅ **המלצה: צור תיקיית `auth/` כמו `orders/`**

### למה זה נכון:

1. **עקביות** - שומר על המבנה הקיים
2. **קל לתחזוקה** - כל מה שקשור ל-auth במקום אחד
3. **Separation of concerns** - auth הוא feature משלו

---

## 📁 המבנה המומלץ:

```
server/src/
├── auth/
│   ├── controllers/
│   │   └── auth.controllers.ts          # login, signup, refresh, logout
│   ├── services/
│   │   └── auth.service.ts              # Business logic (hash, compare, JWT)
│   ├── DAL/
│   │   ├── auth.dal.ts                  # DB operations
│   │   └── pg/
│   │       ├── queries/
│   │       │   └── auth.queries.ts      # SQL queries
│   │       └── tables/
│   │           └── users.table.ts       # CREATE TABLE users
│   ├── routes/
│   │   └── auth.routes.ts               # POST /login, /signup, /logout
│   ├── middlewares/                      # ⭐ חדש!
│   │   ├── authenticate.ts              # Verify JWT token
│   │   └── authorize.ts                 # Check roles/permissions (optional)
│   ├── helpers/                          # ⭐ חדש!
│   │   ├── jwt.helpers.ts               # generateToken, verifyToken
│   │   └── password.helpers.ts          # hash, compare (bcrypt)
│   └── types/
│       └── auth.types.ts                # User, LoginDTO, SignupDTO
│
├── orders/
│   └── routes/
│       └── orders.routes.ts             # ⚠️ כאן תשתמש ב-authenticate middleware
├── demo/
├── middlewares/
│   └── router.ts                         # ⚠️ תוסיף את auth routes
└── ...
```

---

## 📝 דוגמאות קוד:

### 1️⃣ **`auth/routes/auth.routes.ts`**
```typescript
import express from "express";
import { 
  loginController, 
  signupController, 
  logoutController,
  refreshTokenController 
} from "../controllers/auth.controllers";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshTokenController);

export default router;
```

---

### 2️⃣ **`auth/middlewares/authenticate.ts`** (Middleware לבדיקת טוקן)
```typescript
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt.helpers";
import { handleError } from "../../utils/handleError";

export const authenticate = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = verifyToken(token);
    req.user = decoded; // שמירת המשתמש ב-request
    next();
  } catch (error) {
    handleError(res, error);
  }
};
```

---

### 3️⃣ **`auth/helpers/jwt.helpers.ts`**
```typescript
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../helpers/environments";

export const generateToken = (payload: any, expiresIn = "24h") => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET!);
};
```

---

### 4️⃣ **`auth/helpers/password.helpers.ts`**
```typescript
import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
```

---

### 5️⃣ **`middlewares/router.ts`** (עדכון)
```typescript
import express, { Request, Response } from "express";
const router = express.Router();
import demoRoutes from "../demo/routes/demo.routes";
import ordersRoutes from "../orders/routes/orders.routes";
import authRoutes from "../auth/routes/auth.routes"; // ⭐ חדש

router.use("/auth", authRoutes);     // ⭐ חדש
router.use("/demo", demoRoutes);
router.use("/orders", ordersRoutes);

router.use("/", (_: Request, res: Response) => {
  res.status(404).send("לא נמצא נקודת הקצה");
});

export default router;
```

---

### 6️⃣ **שימוש ב-middleware בroutes מוגנים** (`orders/routes/orders.routes.ts`)
```typescript
import express from "express";
import { getAllOrdersController } from "../controllers/orders.controllers";
import { authenticate } from "../../auth/middlewares/authenticate"; // ⭐ חדש

const router = express.Router();

// ⭐ הוסף authenticate middleware
router.get("/", authenticate, getAllOrdersController);

export default router;
```

---

### 7️⃣ **`auth/DAL/pg/tables/users.table.ts`**
```typescript
import { SCHEMA } from "../../../../helpers/environments";

export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS ${SCHEMA}.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
```

---

### 8️⃣ **עדכון `helpers/postgres/createTables.ts`**
```typescript
import { SCHEMA } from "../environments";
import queryToPostgres from "./queryToPostgres";
import { CREATE_DEMO_TABLE } from "../../demo/DAL/pg/tables/demo.table";
import { CREATE_USERS_TABLE } from "../../auth/DAL/pg/tables/users.table"; // ⭐ חדש

const CREATE_DEMO_SCHEMA = `CREATE SCHEMA IF NOT EXISTS ${SCHEMA};`;

export const createTables = async () => {
  try {
    await queryToPostgres(CREATE_DEMO_SCHEMA);
    await queryToPostgres(CREATE_DEMO_TABLE);
    await queryToPostgres(CREATE_USERS_TABLE); // ⭐ חדש
  } catch (error) {
    return Promise.reject(error);
  }
};
```

---

## 📦 חבילות נדרשות:

```bash
npm install jsonwebtoken bcrypt
npm install -D @types/jsonwebtoken @types/bcrypt
```

---

## 🔐 עדכן `.env`:

```env
JWT_SECRET=your-super-secret-key-here-change-in-production
JWT_EXPIRES_IN=24h
```

ו-`helpers/environments.ts`:
```typescript
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
```

---

## ✅ יתרונות הגישה:

1. ✅ **עקביות** - מבנה זהה ל-`orders/` ו-`demo/`
2. ✅ **מודולרי** - קל להוסיף features חדשים
3. ✅ **נקי** - auth middleware במקום אחד
4. ✅ **גמיש** - קל להוסיף OAuth, 2FA וכו' בעתיד
5. ✅ **Testable** - קל לבדוק כל חלק בנפרד

---

## 🎯 סדר הפעולות:

1. צור תיקייה `src/auth/`
2. צור את המבנה (controllers, services, DAL, routes, middlewares, helpers)
3. התקן `jsonwebtoken` ו-`bcrypt`
4. הוסף `JWT_SECRET` ל-`.env`
5. צור את טבלת ה-users
6. הוסף את auth routes ל-`router.ts`
7. הוסף `authenticate` middleware ל-routes מוגנים

---

רוצה שאעבור לagent mode ואעזור לך ליצור את זה? 🚀


# 📚 מה זה DTO?

## DTO = Data Transfer Object

**DTO** הוא **אובייקט להעברת נתונים** בין שכבות שונות באפליקציה (למשל: בין הלקוח לשרת, או בין Controller ל-Service).

---

## 🎯 למה משתמשים ב-DTOs?

1. **Validation** - לוודא שהנתונים שהתקבלו תקינים
2. **Type Safety** - TypeScript יודע בדיוק איזה שדות צריכים להיות
3. **Documentation** - ברור מה צריך לשלוח/לקבל
4. **Security** - מגן מפני שליחת שדות מיותרים (למשל: לא לשלוח `isAdmin: true`)
5. **Separation of Concerns** - מפריד בין המודל במסד הנתונים לבין מה שמועבר ברשת

---

## 💡 דוגמה מהחיים האמיתיים:

### **SignupDTO** - מה המשתמש שולח כשהוא נרשם?

```typescript
// auth/types/auth.types.ts

export interface SignupDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

**זה מה שהלקוח שולח ב-POST request:**
```json
{
  "email": "user@example.com",
  "password": "mySecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

### **LoginDTO** - מה המשתמש שולח כשהוא מתחבר?

```typescript
export interface LoginDTO {
  email: string;
  password: string;
}
```

**זה מה שהלקוח שולח ב-POST request:**
```json
{
  "email": "user@example.com",
  "password": "mySecurePassword123"
}
```

---

## 🔄 ההבדל בין DTO למודל (Model/Entity)

### **User Model** (מה שנשמר במסד הנתונים):
```typescript
export interface User {
  id: number;                    // ⚠️ לא בDTO!
  email: string;
  password: string;              // ⚠️ Hashed!
  firstName: string;
  lastName: string;
  role: string;                  // ⚠️ לא בDTO!
  createdAt: Date;              // ⚠️ לא בDTO!
  updatedAt: Date;              // ⚠️ לא בDTO!
}
```

### **SignupDTO** (מה שמגיע מהלקוח):
```typescript
export interface SignupDTO {
  email: string;
  password: string;              // ⚠️ Plain text - נצטרך להצפין!
  firstName: string;
  lastName: string;
  // אין: id, role, createdAt - השרת יוצר אותם!
}
```

---

## 📝 קובץ מלא: `auth/types/auth.types.ts`

```typescript
// ========== DTOs (Data Transfer Objects) ==========

// מה שמגיע מהלקוח בהרשמה
export interface SignupDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// מה שמגיע מהלקוח בהתחברות
export interface LoginDTO {
  email: string;
  password: string;
}

// ========== Response DTOs ==========

// מה שהשרת מחזיר אחרי login/signup מוצלח
export interface AuthResponseDTO {
  token: string;
  user: UserDTO;  // ⚠️ בלי סיסמה!
}

// מידע על משתמש (בלי סיסמה!)
export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// ========== Database Models ==========

// המודל המלא במסד הנתונים
export interface User {
  id: number;
  email: string;
  password: string;  // ⚠️ Hashed!
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========== JWT Payload ==========

// מה ששומרים בטוקן
export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}
```

---

## 🔒 דוגמה מלאה של שימוש:

### **Controller:**
```typescript
// auth/controllers/auth.controllers.ts
import { Request, Response } from "express";
import { SignupDTO, LoginDTO } from "../types/auth.types";
import { signupService, loginService } from "../services/auth.service";

export const signupController = async (req: Request, res: Response) => {
  try {
    const signupData: SignupDTO = req.body; // ✅ TypeScript יודע מה צריך להיות
    
    // Validation (אופציונלי - אפשר להשתמש ב-Joi או Zod)
    if (!signupData.email || !signupData.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const result = await signupService(signupData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDTO = req.body;
    
    if (!loginData.email || !loginData.password) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    
    const result = await loginService(loginData);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
```

---

### **Service:**
```typescript
// auth/services/auth.service.ts
import { SignupDTO, LoginDTO, AuthResponseDTO, User } from "../types/auth.types";
import { hashPassword, comparePassword } from "../helpers/password.helpers";
import { generateToken } from "../helpers/jwt.helpers";
import { createUserDAL, getUserByEmailDAL } from "../DAL/auth.dal";

export const signupService = async (signupData: SignupDTO): Promise<AuthResponseDTO> => {
  // 1. Hash the password
  const hashedPassword = await hashPassword(signupData.password);
  
  // 2. Create user in DB
  const user: User = await createUserDAL({
    ...signupData,
    password: hashedPassword,
  });
  
  // 3. Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  // 4. Return response (without password!)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
};

export const loginService = async (loginData: LoginDTO): Promise<AuthResponseDTO> => {
  // 1. Get user from DB
  const user = await getUserByEmailDAL(loginData.email);
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  // 2. Compare passwords
  const isPasswordValid = await comparePassword(loginData.password, user.password);
  
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  
  // 3. Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  // 4. Return response (without password!)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
};
```

---

## 🎯 סיכום:

| שם | מטרה | שדות |
|---|---|---|
| **SignupDTO** | מה שמגיע בהרשמה | email, password, firstName, lastName |
| **LoginDTO** | מה שמגיע בהתחברות | email, password |
| **AuthResponseDTO** | מה שחוזר אחרי הצלחה | token, user (ללא סיסמה) |
| **UserDTO** | מידע משתמש (בטוח) | id, email, firstName, lastName, role (ללא password!) |
| **User** | המודל המלא בDB | כל השדות כולל password (hashed), timestamps |
| **JWTPayload** | מה שבטוכן | userId, email, role |

---

## 🔐 חוק זהב:

**לעולם אל תחזיר `password` (גם לא hashed) ללקוח!**

```typescript
// ❌ רע
return user; // יש בו password!

// ✅ טוב
return {
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  // אין password!
};
```

---

יש עוד שאלות? רוצה שאראה איך להוסיף **validation** עם **Zod** או **Joi**? 😊