import './product.css';
import {useState} from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import ShopIcon from '@material-ui/icons/Shop';
import {createProduct} from '../../request/product';
import {useHistory} from 'react-router-dom';


function CreateProductForm () {
    const [file,setFile] = useState();
    const [data,setData] = useState({
        name_product:'',
        price:'',
        about_product:''
    });
    const history = useHistory();
    const [errorValidation,setErrorValidation] = useState();
    const [filePreview,setFilePreview] = useState(); 

    const handleChange = (e) => {
        const {name,value} = e.currentTarget;
        setData({...data,[name]:value})
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let imgData = new FormData();
            imgData.append('file',file)
            imgData.append('product',JSON.stringify(data))
            setErrorValidation(null)
            let res = await createProduct(imgData)
            if (res.data.message) {
                setErrorValidation(res.data.message)
            }
            if (res.data.redirect) {
                history.push(res.data.redirect);
            }
        }catch(err) {
            console.log(err)
        }
    }
    return (
        <div className='container_create-product'>
            {errorValidation && <span>{errorValidation}</span>}
            <form 
                className='form_pos' 
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className='wrapper_form_create'>
                    <div className='create_pr_ph'>
                        {filePreview && <img src={`${filePreview}`} alt='previe' />}
                        <PhotoSizeSelectActualIcon  />
                        <label for="upload-photo">Загрузить фото</label>
                        <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFile(file);
                            setFilePreview(URL.createObjectURL(file))
                        }}
                        name="file"
                        id="upload-photo"
                        />
                    </div>
                    <div className='create_pr_form'>
                        <div className='height_block'>
                        <ShopIcon className="icon_name" />
                            <input 
                                className="name_input"
                                placeholder='Имя вашего товара'
                                name='name_product'
                                value={data.name_product}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='height_block'>
                        <AttachMoneyIcon className="icon_name"/>
                            <input 
                                className="name_input" p
                                laceholder='Цена вашего товара'
                                onChange={handleChange}
                                name='price'
                                value={data.price}
                            />
                        </div>
                        <div className='block_form_input'>
                            <textarea 
                                placeholder='Описание вашего товара'
                                onChange={handleChange}
                                name='about_product'
                                value={data.about_product}
                            />
                        </div>
                    </div>
                </div>
                <button className='btn_create_product'>Создать Товар</button>
            </form>
        </div>
    )
}

export default CreateProductForm;