class Employee_Role {
    constructor(id, title, salary, department_id) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id
}

gettitle() {
        return this.title;
}
getId() {
    return this.id
}
getsalary() {
    return this.salary;
}
getdepartment_id() {
    return this.department_id;
}


};

module.exports = Employee_Role;