import React from "react";
import { ActivityIndicator, Modal } from "react-native-paper";

const Spinner: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {

    return (
        <Modal visible={isVisible}>
            <ActivityIndicator animating={isVisible} size={"large"} />
        </Modal>
    )

}

export default Spinner;