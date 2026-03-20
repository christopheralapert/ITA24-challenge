import Button from './UI/Button';

const currencyFormatter = new Intl.NumberFormat('et-EE', {
    style: 'currency',
    currency: 'EUR',
});

const MealItem = ({ name, price, description, image }) => {
    const formattedPrice = currencyFormatter.format(price);

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${image}`)} alt={name}/>
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{formattedPrice}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button>Add to Cart</Button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem