import { useEffect, useState } from 'react';
import MealItem from './MealItem';

const Meals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('http://localhost:3001/meals');
            const mealsData = await response.json();
            setMeals(mealsData);
            console.log(mealsData);
        };

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {meals.map((meal) => (
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    price={meal.price}
                    description={meal.description}
                    image={meal.image}
                />
            ))}
        </ul>
    )
}

export default Meals