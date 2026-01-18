import { useEffect }, React from 'react';
import Debug from 'debug';
const debug = Debug('hooks:useSafeEffect');

export function useSafeEffect(effect, deps, name = 'anonymous') {
    useEffect(() => {
        try {
            const cleanup = effect();
            // Handle async effects
            if (cleanup instanceof Promise) {
                cleanup.catch(err => {
                    debug(`error in "${name}":`, err);
                });
                return;
            }
            // Return cleanup function wrapped in try-catch
            if (typeof cleanup === 'function') {
                return () => {
                    try {
                        cleanup();
                    } catch (err) {
                        debug(`cleanup error in "${name}":`, err);
                    }
                };
            }
            return cleanup;
        } catch (err) {
            debug(`error in "${name}":`, err);
        }
    }, deps);
}

export default useSafeEffect;
