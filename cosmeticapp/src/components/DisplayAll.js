import Cosmetic from "./Cosmetic";

const DisplayAll = ({all_cosmetics}) =>{

  return(
    <div>
      {
        all_cosmetics.map(item => 
          <Cosmetic 
            cosmetic={item}
            key={item._id}
          />
        )
      }
    </div>
  )
}

export default DisplayAll;
