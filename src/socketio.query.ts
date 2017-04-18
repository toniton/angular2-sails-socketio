import * as _ from "lodash";

export class SocketIOQuery {

    private criteria: object = {};

    private where: string = "";

    private limit: number = 30;

    private sort: string = "";

    private skip: number = 0;

    private whereFunction(): string {
        if (_.isEmpty(this.criteria)) {
            return null;
        }
        return "where=" + JSON.stringify(this.criteria);
    }

    public setLimit(limit: number): SocketIOQuery {
        this.limit = limit;
        return this;
    }

    public limitFunction(): string {
        if (this.limit == null) {
            return null;
        }
        return "limit=" + this.limit.toString();
    }

    public setSort(sort: string): SocketIOQuery {
        this.sort = sort;
        return this;
    }

    public sortFunction(): string {
        if (this.sort == null || _.isEmpty(this.sort)) {
            return null;
        }
        return "sort=" + this.sort;
    }

    public setSkip(skip: number): SocketIOQuery {
        this.skip = skip;
        return this;
    }

    public skipFunction(): string {
        if (this.skip == null) {
            return null;
        }
        return "skip=" + this.skip.toString();
    }

    public buildQuery(): string {
        let queryBuilder = "";
        let wherePart = this.whereFunction();
        if (wherePart != null) {
            if (!_.isEmpty(queryBuilder)) {
                queryBuilder += '&';
            }
            queryBuilder += wherePart;
        }

        let limitPart = this.limitFunction();
        if (limitPart != null) {
            if (!_.isEmpty(queryBuilder)) {
                queryBuilder += '&';
            }
            queryBuilder += limitPart;
        }

        let skipPart = this.skipFunction();
        if (skipPart != null) {
            if (!_.isEmpty(queryBuilder)) {
                queryBuilder += '&';
            }
            queryBuilder += skipPart;
        }

        let sortPart = this.sortFunction();
        if (sortPart != null) {
            if (!_.isEmpty(queryBuilder)) {
                queryBuilder += '&';
            }
            queryBuilder += sortPart;
        }

        if (queryBuilder.charAt(0) != '?') {
            queryBuilder = '?' + queryBuilder;
        }
        return queryBuilder.toString();
    }


    public or(value: string): SocketIOQuery {
        let lastWhere = _.findLastKey(this.criteria);
        if (_.isString(this.criteria[lastWhere])) {
            this.criteria[lastWhere] = [this.criteria[lastWhere], value];
        } else if (_.isArray(this.criteria[lastWhere])) {
            this.criteria[lastWhere].push(value);
        } else if (_.isObject(this.criteria[lastWhere])) {
            let lastInnerWhere = _.findLastKey(this.criteria[lastWhere]);
            this.criteria[lastWhere][lastInnerWhere] = [this.criteria[lastWhere][lastInnerWhere], value];
        }
        return this;
    }

    public orWhereEqualTo(key: string, value: string): SocketIOQuery {
        let lastWhere = _.findLastKey(this.criteria);
        let whereClause = {};
        whereClause[key] = value;
        if (!_.isArray(this.criteria['or'])) {
            let whereArray = [];
            whereArray.push(whereClause);
            this.criteria = { or: whereArray };
        } else {
            this.criteria['or'].push(whereClause);
        }
        return this;
    }

    public whereEqualTo(key: string, value: string): SocketIOQuery {
        this.criteria[key] = value;
        return this;
    }

    public whereNotEqualTo(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { '!': value };
        return this;
    }

    public whereLike(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { 'like': value };
        return this;
    }

    public whereContains(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { 'contains': value };
        return this;
    }

    public whereStartsWith(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { 'startsWith': value };
        return this;
    }

    public whereEndsWith(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { 'endsWith': value };
        return this;
    }

    public whereNotIn(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { 'contains': value };
        return this;
    }

    public whereLessThan(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { '<': value };
        return this;
    }

    public whereLessThanOrEqualTo(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { '<=': value };
        return this;
    }

    public whereGreaterThan(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { '>': value };
        return this;
    }

    public whereGreaterThanOrEqualTo(key: string, value: string): SocketIOQuery {
        this.criteria[key] = { '>=': value };
        return this;
    }

}