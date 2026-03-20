const Button = ({ textOnly, onClick, children }) => {
    const cssClasses = textOnly ? 'text-button' : 'button';

    return (
        <button className={cssClasses} onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;