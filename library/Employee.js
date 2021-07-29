class Employee {
    constructor(id, first_name, last_name, role_id, coach_id) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.role_id = coach_id;

}

getfirstname() {
        return this.first_name;
}
getId() {
    return this.id
}
getlastname() {
    return this.last_name;
}
getrole_id() {
    return this.role_id;
}
getcoach_id() {
    return this.coach_id;
}


};

module.exports = Employee;