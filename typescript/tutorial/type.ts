/**
 * types
 */
import type { PropType } from 'vue'

type IButtonType = 'primary' | 'success' | 'default';

type EmitFn = (event: Event) => void;

// todo proptypes 的作用
// https://github1s.com/vuejs/vue/blob/dev/types/options.d.ts
type IButtonType2 = PropType<IButtonType>


