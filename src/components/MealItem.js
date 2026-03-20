import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const currencyFormatter = new Intl.NumberFormat('et-EE', {
    style: 'currency',
    currency: 'EUR',
});

const MealItem = ({ id, name, price, description, image }) => {
    const cartCtx = useContext(CartContext);
    const formattedPrice = currencyFormatter.format(price);

    const handleAddMealToCart = () => {
        cartCtx.addItem({
            id,
            name,
            price,
            description,
            image,
        });
    };

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
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem