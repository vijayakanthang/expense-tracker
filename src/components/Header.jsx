import './stylesheet/Header.css';

function Header() {
    return (
        <div className="navbar">
            <div className="navl">
                <img src="https://cdn-icons-png.flaticon.com/128/10815/10815314.png" alt="Logo" className="img" />
                <h1>Expense Tracker</h1>
            </div>
            <div className="navr">
                <a href="#" className="rt">Home</a>
                <a href="#" className="rt">About Us</a>
                <a href="#" className="rt">Contact Us</a>
            </div>
        </div>
    );
}

export default Header;
