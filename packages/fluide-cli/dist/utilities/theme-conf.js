// @ts-expect-error
import { Conf } from '@shopify/cli-kit/node/conf';
let _instance;
export default function themeConf() {
    // eslint-disable-next-line
    if (!_instance) {
        _instance = new Conf({ projectName: 'shopify-cli-theme-conf' });
    }
    return _instance;
}
