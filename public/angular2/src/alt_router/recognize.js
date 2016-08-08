'use strict';"use strict";
var segments_1 = require('./segments');
var metadata_1 = require('./metadata/metadata');
var lang_1 = require('angular2/src/facade/lang');
var promise_1 = require('angular2/src/facade/promise');
var exceptions_1 = require('angular2/src/facade/exceptions');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function recognize(componentResolver, type, url) {
    return _recognize(componentResolver, type, url, url.root)
        .then(function (nodes) { return new segments_1.Tree(nodes); });
}
exports.recognize = recognize;
function _recognize(componentResolver, type, url, current) {
    var metadata = _readMetadata(type); // should read from the factory instead
    var matched;
    try {
        matched = _match(metadata, url, current);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    return componentResolver.resolveComponent(matched.route.component)
        .then(function (factory) {
        var segment = new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, "", matched.route.component, factory);
        if (lang_1.isPresent(matched.leftOver)) {
            return _recognize(componentResolver, matched.route.component, url, matched.leftOver)
                .then(function (children) { return [segment].concat(children); });
        }
        else {
            return [segment];
        }
    });
}
function _match(metadata, url, current) {
    for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
        var r = _a[_i];
        var matchingResult = _matchWithParts(r, url, current);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    throw new exceptions_1.BaseException("Cannot match any routes");
}
function _matchWithParts(route, url, current) {
    var parts = route.path.split("/");
    var parameters = {};
    var consumedUrlSegments = [];
    var u = current;
    for (var i = 0; i < parts.length; ++i) {
        consumedUrlSegments.push(u);
        var p = parts[i];
        if (p.startsWith(":")) {
            var segment = u.segment;
            parameters[p.substring(1)] = segment;
        }
        else if (p != u.segment) {
            return null;
        }
        u = url.firstChild(u);
    }
    return new _MatchingResult(route, consumedUrlSegments, parameters, u);
}
var _MatchingResult = (function () {
    function _MatchingResult(route, consumedUrlSegments, parameters, leftOver) {
        this.route = route;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOver = leftOver;
    }
    return _MatchingResult;
}());
function _readMetadata(componentType) {
    var metadata = reflection_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
    if (metadata.length === 0) {
        throw new exceptions_1.BaseException("Component '" + lang_1.stringify(componentType) + "' does not have route configuration");
    }
    return metadata[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1CUkplcjFKOS50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5QkFBNkMsWUFBWSxDQUFDLENBQUE7QUFDMUQseUJBQTRDLHFCQUFxQixDQUFDLENBQUE7QUFDbEUscUJBQXlDLDBCQUEwQixDQUFDLENBQUE7QUFDcEUsd0JBQTZCLDZCQUE2QixDQUFDLENBQUE7QUFDM0QsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFFN0QsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEUsbUJBQTBCLGlCQUFvQyxFQUFFLElBQVUsRUFDaEQsR0FBcUI7SUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDcEQsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxlQUFJLENBQWUsS0FBSyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBSmUsaUJBQVMsWUFJeEIsQ0FBQTtBQUVELG9CQUFvQixpQkFBb0MsRUFBRSxJQUFVLEVBQUUsR0FBcUIsRUFDdkUsT0FBbUI7SUFDckMsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsdUNBQXVDO0lBRTVFLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxDQUFDO1FBQ0gsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUU7SUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMs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RUQ7SUFDRSx5QkFBbUIsS0FBb0IsRUFBUyxtQkFBaUMsRUFDOUQsVUFBbUMsRUFBUyxRQUFvQjtRQURoRSxVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO1FBQzlELGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBWTtJQUFHLENBQUM7SUFDekYsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVELHVCQUF1QixhQUFtQjtJQUN4QyxJQUFJLFFBQVEsR0FBRyxzQkFBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLFlBQVkseUJBQWMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQzdGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLElBQUksMEJBQWEsQ0FDbkIsZ0JBQWMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsd0NBQXFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZVNlZ21lbnQsIFVybFNlZ21lbnQsIFRyZWV9IGZyb20gJy4vc2VnbWVudHMnO1xuaW1wb3J0IHtSb3V0ZXNNZXRhZGF0YSwgUm91dGVNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YSc7XG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB0eXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWU8VXJsU2VnbWVudD4pOiBQcm9taXNlPFRyZWU8Um91dGVTZWdtZW50Pj4ge1xuICByZXR1cm4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgdHlwZSwgdXJsLCB1cmwucm9vdClcbiAgICAgIC50aGVuKG5vZGVzID0+IG5ldyBUcmVlPFJvdXRlU2VnbWVudD4obm9kZXMpKTtcbn1cblxuZnVuY3Rpb24gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIsIHR5cGU6IFR5cGUsIHVybDogVHJlZTxVcmxTZWdtZW50PixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IFByb21pc2U8Um91dGVTZWdtZW50W10+IHtcbiAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YSh0eXBlKTsgIC8vIHNob3VsZCByZWFkIGZyb20gdGhlIGZhY3RvcnkgaW5zdGVhZFxuXG4gIGxldCBtYXRjaGVkO1xuICB0cnkge1xuICAgIG1hdGNoZWQgPSBfbWF0Y2gobWV0YWRhdGEsIHVybCwgY3VycmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVqZWN0KGUsIG51bGwpO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQobWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQpXG4gICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSBuZXcgUm91dGVTZWdtZW50KG1hdGNoZWQuY29uc3VtZWRVcmxTZWdtZW50cywgbWF0Y2hlZC5wYXJhbWV0ZXJzLCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQsIGZhY3RvcnkpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hlZC5sZWZ0T3ZlcikpIHtcbiAgICAgICAgICByZXR1cm4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgbWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQsIHVybCwgbWF0Y2hlZC5sZWZ0T3ZlcilcbiAgICAgICAgICAgICAgLnRoZW4oY2hpbGRyZW4gPT4gW3NlZ21lbnRdLmNvbmNhdChjaGlsZHJlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbc2VnbWVudF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfbWF0Y2gobWV0YWRhdGE6IFJvdXRlc01ldGFkYXRhLCB1cmw6IFRyZWU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IF9NYXRjaGluZ1Jlc3VsdCB7XG4gIGZvciAobGV0IHIgb2YgbWV0YWRhdGEucm91dGVzKSB7XG4gICAgbGV0IG1hdGNoaW5nUmVzdWx0ID0gX21hdGNoV2l0aFBhcnRzKHIsIHVybCwgY3VycmVudCk7XG4gICAgaWYgKGlzUHJlc2VudChtYXRjaGluZ1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBtYXRjaGluZ1Jlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJDYW5ub3QgbWF0Y2ggYW55IHJvdXRlc1wiKTtcbn1cblxuZnVuY3Rpb24gX21hdGNoV2l0aFBhcnRzKHJvdXRlOiBSb3V0ZU1ldGFkYXRhLCB1cmw6IFRyZWU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IF9NYXRjaGluZ1Jlc3VsdCB7XG4gIGxldCBwYXJ0cyA9IHJvdXRlLnBhdGguc3BsaXQoXCIvXCIpO1xuICBsZXQgcGFyYW1ldGVycyA9IHt9O1xuICBsZXQgY29uc3VtZWRVcmxTZWdtZW50cyA9IFtdO1xuXG4gIGxldCB1ID0gY3VycmVudDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN1bWVkVXJsU2VnbWVudHMucHVzaCh1KTtcbiAgICBsZXQgcCA9IHBhcnRzW2ldO1xuICAgIGlmIChwLnN0YXJ0c1dpdGgoXCI6XCIpKSB7XG4gICAgICBsZXQgc2VnbWVudCA9IHUuc2VnbWVudDtcbiAgICAgIHBhcmFtZXRlcnNbcC5zdWJzdHJpbmcoMSldID0gc2VnbWVudDtcbiAgICB9IGVsc2UgaWYgKHAgIT0gdS5zZWdtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdSA9IHVybC5maXJzdENoaWxkKHUpO1xuICB9XG4gIHJldHVybiBuZXcgX01hdGNoaW5nUmVzdWx0KHJvdXRlLCBjb25zdW1lZFVybFNlZ21lbnRzLCBwYXJhbWV0ZXJzLCB1KTtcbn1cblxuY2xhc3MgX01hdGNoaW5nUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBSb3V0ZU1ldGFkYXRhLCBwdWJsaWMgY29uc3VtZWRVcmxTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHB1YmxpYyBsZWZ0T3ZlcjogVXJsU2VnbWVudCkge31cbn1cblxuZnVuY3Rpb24gX3JlYWRNZXRhZGF0YShjb21wb25lbnRUeXBlOiBUeXBlKSB7XG4gIGxldCBtZXRhZGF0YSA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgUm91dGVzTWV0YWRhdGEpO1xuICBpZiAobWV0YWRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBDb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudFR5cGUpfScgZG9lcyBub3QgaGF2ZSByb3V0ZSBjb25maWd1cmF0aW9uYCk7XG4gIH1cbiAgcmV0dXJuIG1ldGFkYXRhWzBdO1xufSJdfQ==