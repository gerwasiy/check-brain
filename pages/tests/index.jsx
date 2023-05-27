import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/header";
import TestCard from "../../components/testCard";
import Footer from "../../components/footer";

export default function Tests(){

    const testsArray = [
        {
            name:'Reflex Training',
            description:`Аркада, в якій гравець має швидко і точно натискати на кола, які випадковим чином з'являються на ігровому полі. Тест розвиває у гравця швидкість реакції та зорову уваги. Ціль - набрати якомога більше очок за обмежений час. `,
            path:'/tests/ReflexTraining'
        },
        {
            name:'Reaction Rate',
            description:`Це тренажер для вимірювання швидкості реакції користувача. Коли користувач натискає кнопку, на екрані з'являється блок, на який потрібно якомога швидше натиснути і час реакції фіксується. Тест дозволяє користувачеві виміряти свою швидкість реакції та вдосконалювати її.`,
            path:'/tests/ReactionRate'
        }
    ]

    return (
        <PrivateRoute>
             <Header/>
             <div className="card-list">
             {testsArray.map((test) => (
              <TestCard
                key={test}
                testName={test.name}
                description={test.description}
                path={test.path}
              />
            ))}
            </div> 
            <Footer/> 
        </PrivateRoute>
        
    );
}