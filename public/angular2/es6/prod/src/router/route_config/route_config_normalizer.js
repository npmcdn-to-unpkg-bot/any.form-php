import { AsyncRoute, AuxRoute, Route, Redirect } from './route_config_decorator';
import { isType } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
/**
 * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
 * AuxRoute or Redirect object.
 *
 * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
 * `RouteRegistry`.
 */
export function normalizeRouteConfig(config, registry) {
    if (config instanceof AsyncRoute) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config instanceof Route || config instanceof Redirect || config instanceof AuxRoute) {
        return config;
    }
    if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
        throw new BaseException(`Route config should contain exactly one "component", "loader", or "redirectTo" property.`);
    }
    if (config.as && config.name) {
        throw new BaseException(`Route config should contain exactly one "as" or "name" property.`);
    }
    if (config.as) {
        config.name = config.as;
    }
    if (config.loader) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config.aux) {
        return new AuxRoute({ path: config.aux, component: config.component, name: config.name });
    }
    if (config.component) {
        if (typeof config.component == 'object') {
            let componentDefinitionObject = config.component;
            if (componentDefinitionObject.type == 'constructor') {
                return new Route({
                    path: config.path,
                    component: componentDefinitionObject.constructor,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else if (componentDefinitionObject.type == 'loader') {
                return new AsyncRoute({
                    path: config.path,
                    loader: componentDefinitionObject.loader,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else {
                throw new BaseException(`Invalid component type "${componentDefinitionObject.type}". Valid types are "constructor" and "loader".`);
            }
        }
        return new Route(config);
    }
    if (config.redirectTo) {
        return new Redirect({ path: config.path, redirectTo: config.redirectTo });
    }
    return config;
}
function wrapLoaderToReconfigureRegistry(loader, registry) {
    return () => {
        return loader().then((componentType) => {
            registry.configFromComponent(componentType);
            return componentType;
        });
    };
}
export function assertComponentExists(component, path) {
    if (!isType(component)) {
        throw new BaseException(`Component for route "${path}" is not defined, or is not a class.`);
    }
}
