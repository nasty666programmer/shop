import { useState, useEffect } from "react";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { editProfile } from "../../request/profile";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { editProfiles } from "../../store/action";
import axios from 'axios'

function ProfileForm(props) {
  const [data, setData] = useState({
    name: "",
    password: "",
    
  });
  const [error, setError] = useState();
  const [update, setUpdate] = useState(null);
  const [file,setFile] = useState();

  const handleChange = (e) => {
    let { name, value } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        

    //   const dataImg = new FormData();
    //     dataImg.append('file',file);
      let res = await editProfile(data);
      if (res.data.message) {
        setError(res.data.message);
      }
      if (res.data.redirect) {
            history.push(res.data.redirect)
      }
    } catch (err) {
      console.log(err);
    }
    setData({ ...data, name: "", password: "", img: "" });
  };



  const [hiddenMenu, setHiddenMenu] = useState(false);

  return (
    <div className="wrapper_edit_profile">
      <div
        className={`edit_profile_navbar ${error && "error_validation"}`}
        onClick={() => setHiddenMenu(!hiddenMenu)}
      >
        {!error ? `Изменить Данные Профиля` : `*${error}`}
      </div>
      <div className={` ${hiddenMenu && "form-data"}`}>
        {hiddenMenu && (
          <form className='forms_profile' onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="height_block">
              <TextFieldsIcon className="icon_name" />
              <input
                type="text"
                className="name_input"
                placeholder="Введите имя"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="height_block">
              <VpnKeyIcon className="icon_name" />
              <input
                type="text"
                className="name_input"
                placeholder="Введите пароль"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
           
            <div>
              <button className="btn_submit">Изменить</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  editProfiles,
};

export default connect(null, mapDispatchToProps)(ProfileForm);
