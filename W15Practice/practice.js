// Leet code 116

function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};



var connect = function(root) {
    if(!root) return null;
    if(!root.left && !root.right) return root;
    root.left.next = root.right;
    if(root.next) root.right.next = root.next.left;
    root.left = connect(root.left);
    root.right = connect(root.right);
    return root;
};
