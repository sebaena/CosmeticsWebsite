import { useSelector } from 'react-redux';


const CosmeticDisplay = ()=> {
    const currentCosmetic = useSelector((state)=> state.cosmetic.currentCosmetic);

    return Object.keys(currentCosmetic).length > 0 ? (
        <div>
            <img src={currentCosmetic.picture} />
            <p>Cosmetic Name : {currentCosmetic.name}</p>
        </div>
    ):(<></>)
}

export default CosmeticDisplay;