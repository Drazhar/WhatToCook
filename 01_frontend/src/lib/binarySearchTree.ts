class Node {
  data: number
  payload: any
  left: Node | null
  right: Node | null

  constructor(data: number, payload: any) {
    this.data = data
    this.payload = payload
    this.left = null
    this.right = null
  }
}

export default class BinarySearchTree {
  private root: Node | null
  constructor() {
    this.root = null
  }

  insert(data: number, payload: any) {
    const newNode = new Node(data, payload)
    if (this.root === null) this.root = newNode
    else this.insertNode(this.root, newNode)
  }

  private insertNode(node: Node, newNode: Node) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode
      else this.insertNode(node.left, newNode)
    } else {
      if (node.right === null) node.right = newNode
      else this.insertNode(node.right, newNode)
    }
  }

  getSortedArr() {
    const output: any[] = []
    if (this.root) this.recursiveFill(output, this.root)
    return output
  }

  private recursiveFill(arr: any, node: Node) {
    if (node.right) this.recursiveFill(arr, node.right)
    arr.push(node.payload)
    if (node.left) this.recursiveFill(arr, node.left)
  }
}
