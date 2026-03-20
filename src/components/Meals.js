import { useEffect } from 'react';

const Meals = () => {
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('http://localhost:3001/meals');
            const meals = await response.json();
            console.log(meals);
        };

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            <h2>create list of meals, using fetch data from backend</h2>
        </ul>
    )
}

export default Meals