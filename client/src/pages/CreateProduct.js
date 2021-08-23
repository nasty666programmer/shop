import '../components/Product/product.css';
import CreateProductForm from '../components/Product/CreateProductForm'
import CreateProductRule from '../components/Product/CreateProductRule';

function CreateProduct () {
    return (
        <div>
            <div className='header_create_product'>
                <h1>Создать Товар</h1>
            </div>
            <div className='container_block_create-product'>
                <CreateProductRule />
                <CreateProductForm />
            </div>
        </div>
    )
}

export default CreateProduct;