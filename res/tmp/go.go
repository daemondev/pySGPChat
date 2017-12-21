package main

import "fmt"

func main() {
	n := 0
        add := 0
        limit := 999999999
	for i := 1; i < limit; i++ {
		add += i * 2
	}
        n = add
	fmt.Println(n)
}
