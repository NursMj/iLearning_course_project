import { Card } from 'react-bootstrap'

function ItemCard(props: any) {
    const {item} = props

    return (
         
        (<Card>{item.title} {item.collaction} {item.author}</Card>) 
        
    )
}

export default ItemCard