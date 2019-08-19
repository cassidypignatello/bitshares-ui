import React from "react";
import AltContainer from "alt-container";
import counterpart from "counterpart";
import {Form} from "bitshares-ui-style-guide";
import WalletUnlockStore from "stores/WalletUnlockStore";
import SettingsActions from "actions/SettingsActions";

const LoginTypeSelectorView = ({value, onChange}) => (
    <Form.Item>
        {counterpart.translate("account.login_with")}
        &nbsp;
        {counterpart.translate("account.name")}(
        {counterpart.translate("wallet.password_model").toLowerCase()})
    </Form.Item>
);

const LoginTypeSelector = props => (
    <AltContainer
        stores={[WalletUnlockStore]}
        inject={{
            value: () =>
                WalletUnlockStore.getState().passwordLogin ? "cloud" : "local"
        }}
        actions={() => ({
            onChange: value => {
                const newType = value;
                const validValues = ["cloud", "local"];
                if (!newType in validValues)
                    throw new Error("Invalid login type value");
                return SettingsActions.changeSetting({
                    setting: "passwordLogin",
                    value: newType === "cloud"
                });
            }
        })}
    >
        <LoginTypeSelectorView {...props} />
    </AltContainer>
);

export default LoginTypeSelector;
