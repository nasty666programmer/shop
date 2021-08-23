import './home_page.css';

function CardExample (props) {
    const {img,text} = props;
    return (
        <div className='container_card'>
            <div className='wrapper'>
                <div className='images_card'>{img}</div>
                <div className='text_card'>{text}</div>
            </div>
        </div>
    )
}

export default CardExample;