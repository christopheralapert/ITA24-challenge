const MealItem = ({ name, price, description, image }) => {
    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${image}`)} alt={name}/>
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <button >Add to Cart</button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem