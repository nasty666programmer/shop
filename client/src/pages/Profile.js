import {connect} from 'react-redux';
import ProfileForm from '../components/Profile/ProfileForm';
import ProfileHead from '../components/Profile/ProfileHead';

function Profile (props) {
    return (
        <div>
            <div>
                <ProfileHead />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data:state
    }
}

export default connect(mapStateToProps,null)(Profile);