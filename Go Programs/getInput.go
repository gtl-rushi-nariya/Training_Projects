package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Printf("Type something:")
	scanner.Scan()
	input, _ := strconv.ParseInt(scanner.Text(), 10, 64)
	// fmt.Printf("You typed: %q", input)
	fmt.Printf("Your age is %d", 2020-input)
}
