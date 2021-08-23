import ProfileForm from "./ProfileForm";
import { connect } from "react-redux";
import { useEffect,useState } from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import {editPhotoProfile} from '../../request/profile';
import {useHistory} from 'react-router-dom';

function ProfileHead(props) {
    const history = useHistory();
    const [file,setFile] = useState();
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const data = new FormData();
            data.append('file',file);
            let res = await editPhotoProfile(data);
            if (res.data.redirect) {
                history.push(res.data.redirect)
            }
        }catch(e) {
            console.log(e)
        }
    }

  return props.data.name ? (
    <div>
      <div className="profile_header">Профиль</div>
      <div className="profile_main">
        <div className="about">
          <img
            className="avatars"
            src={`${props.data.avatarUrl}`}
            alt="photo"
          />
          <div className="height_block">
              <form onSubmit={handleSubmit}>
              <PhotoIcon />
                <label for="upload-photo">Загрузить фото</label>
                <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    setFile(file);
                }}
                name="file"
                id="upload-photo"
                />
                {file ?<button className='btn_ph_send'>send</button> : <></>}
              </form>
          </div>
          <div className="users_navbar">
            <div className="users_navbar_info ">
              <div id="name_user_bar">{props.data.name}</div>
              <div id="email_user_bar">{props.data.email}</div>
            </div>
          </div>
        </div>
        <ProfileForm />
      </div>
    </div>
  ) : (
    <></>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};

export default connect(mapStateToProps, null)(ProfileHead);
