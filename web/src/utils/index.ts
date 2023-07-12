import {RouteObject} from "react-router"
import {cloneDeep} from "lodash"
export const routeCopy = (item:RouteObject) => {
    const route = cloneDeep(item)
    delete route.element
    if(Reflect.has(route,"children")){
        route.children = route.children.map(val => routeCopy(val))
    }
    return route
}