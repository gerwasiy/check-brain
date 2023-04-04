import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/header";
import TestCard from "../../components/testCard";


export default function Dashboard(){

    const testsArray = [
        {
            name:'Reflex Training',
            description:`Аркада, в якій гравець має швидко і точно натискати на кола, які випадковим чином з'являються на ігровому полі. Тест розвиває у гравця швидкість реакції та зорову уваги. Ціль - набрати якомога більше очок за обмежений час. `,
            path:'/tests/ReflexTraining'
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
        </PrivateRoute>
        
    );
}