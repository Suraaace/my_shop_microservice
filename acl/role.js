const roles = [
    {
        _id: 3,
        name: "Administrator"
    },
    {
        _id: 4,
        name: "Staff"
    },
    {
        _id: 7,
        name: "User"
    }
];

const roleDetail = (roleId) => {
    return roles.find((item) => item._id === roleId);
};

module.exports = {
    roles: roles,
    roleDetail: roleDetail
};