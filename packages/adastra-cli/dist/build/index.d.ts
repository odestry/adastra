import * as _oclif_core_lib_interfaces_parser from '@oclif/core/lib/interfaces/parser';
import * as _oclif_core_lib_interfaces from '@oclif/core/lib/interfaces';
import { Command } from '@oclif/core';

declare class Build extends Command {
    static description: string;
    static flags: {
        minify: _oclif_core_lib_interfaces.BooleanFlag<boolean>;
        sourcemap: _oclif_core_lib_interfaces.BooleanFlag<boolean>;
        'log-level': _oclif_core_lib_interfaces.OptionFlag<string, _oclif_core_lib_interfaces_parser.CustomOptions>;
    };
    run(): Promise<void>;
}

export { Build as default };
