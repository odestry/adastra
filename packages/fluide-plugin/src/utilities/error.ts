import { CLIENT_SCRIPT_PATH } from '../constants'

export const getErrorMarkup = (error: Error): string => (
  `<script type="module">
      import {ErrorOverlay} from '/${CLIENT_SCRIPT_PATH}';
      document.body.appendChild(new ErrorOverlay(${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      ).replace(/</g, '\\u003c')}));
  </script>`
)
