import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      const searchCondition = {
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: "i" },
            } as FilterQuery<T>)
        ),
      };

      this.modelQuery = this.modelQuery.find(searchCondition);
    }

    return this;
  }

  filter() {
    const queryObject = { ...this.query };

    const excludeFields = ["search", "sortBy", "sortOrder", "filter"];
    excludeFields.forEach((el) => delete queryObject[el]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy as string;
    const sortOrder = this?.query?.sortOrder as string;

    if (sortBy) {
      const order = sortOrder === "asc" ? "" : "-";
      this.modelQuery = this.modelQuery.sort(`${order}${sortBy}`);
    } else {
      this.modelQuery = this.modelQuery.sort("-createdAt");
    }
    return this;
  }
}
export default QueryBuilder;
