class RoleModel {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.description = data.description;
    }
}
module.exports = RoleModel;
