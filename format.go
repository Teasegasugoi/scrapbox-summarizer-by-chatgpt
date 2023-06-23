package main

import (
	"strings"
	"syscall/js"
)

func main() {
	js.Global().Set("format", js.FuncOf(format))
	select {}
}

func format(this js.Value, args []js.Value) any {
	target := args[0].String()
	arr := strings.Split(target, "\n")
	if !isScrapboxFormat(arr) {
		return ""
	}
	var output []string
	for _, item := range arr {
		index := countHeadSpaces(item)
		output = append(output, blankToDot(item, index))
	}
	return strings.Join(output, "\n")
}

func isScrapboxFormat(arr []string) bool {
	for _, item := range arr {
		count := countHeadSpaces(item)
		if count == 0 {
			return false
		}
	}
	return true
}

func countHeadSpaces(str string) int {
	count := 0
	for _, r := range str {
		if r != '	' {
			break
		}
		count++
	}
	return count
}

func blankToDot(str string, index int) string {
	r := []rune(str)
	r[index-1] = rune('・')
	return string(r)
}
