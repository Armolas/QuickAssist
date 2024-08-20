function Button({text, color, type = 'button', className, onClick}) {
    return (
        <button onClick={onClick} type={`${type}`} className={`border-2 ${color} ${className} rounded-full hover:border-violet-600 shadow-2xl p-2`}>
            { text }
            </button>
    )
}
export default Button;