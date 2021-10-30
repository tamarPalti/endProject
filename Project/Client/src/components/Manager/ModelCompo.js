import { useState } from 'react';
import { Button, Image, Modal, List } from 'semantic-ui-react';

const ModelCompo = (props) => {



    const [open, setOpen] = useState(false);
    const styleAction = { "height": "3em", "margin-top": "-7%" }

    return (<>

        <Modal

            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<div>
                {props.button}
            </div>}
        >

            <div style={{ "margin-top": "155px" }}>
                {props.compo}
            </div>

        </Modal>





    </>);
}

export default ModelCompo;