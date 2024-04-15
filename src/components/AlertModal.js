
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


export default function SubmitButton(){
    const saveData=async() => {
        const [alert, setAlert] = useState(false);
        const [alertContent, setAlertContent] = useState('');
        await axios.post('/API', passedParams)
        .then(response => {
          if(response.data.success === true)
            {
              setAlertContent(response.data.result);
              setAlert(true);
            }
          else
            {
              setAlertContent(response.data.result);
              setAlert(true);
            }
         }).catch(error=>{
            alert(error)
         })
    
    //content of modal
    const bodyInsert = (
    <div>
        <Button onClick={()=>saveData()}>Save</Button>
    </div>
    )
    return(
    <div>
    {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
    <Modal
       open = {modalInsert}
       onClose = {openCloseModalInsert}>
       {bodyInsert}
    </Modal>
    </div>
    )
    }
}

