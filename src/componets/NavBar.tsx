


export default function NavBar(){
    return (
        <div className="nav-bar" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', position: 'fixed', top: '0', left: '0', right: '0', backgroundColor: '#f0f0f0'}}>
            <h1>NavBar</h1>
            <div className="nav-bar-right">
                <button>Login</button>
                <button>Register</button>
                <button>Guest</button>
            </div>
        </div>
    )
}