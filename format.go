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
	var output []string
	output = append(output, "以下の箇条書きを1つに文章化しなさい\n\n")
	for _, item := range arr {
		index := countHeadSpaces(item)
		if index != 0 {
			output = append(output, blankToDot(item, index))
		} else {
			output = append(output, item)
		}
	}
	return strings.Join(output, "\n")
}
func countHeadSpaces(str string) int {
	count := 0
	for _, r := range str {
		// U+0009, U+0020, U+3000
		if r != '	' && r != ' ' && r != '　' {
			break
		}
		count++
	}
	return count
}

func blankToDot(str string, index int) string {
	r := []rune(str)
	// Unified with U+3000
	for i := 0; i < index; i++ {
		r[i] = rune(' ')
	}
	r[index-1] = rune('・')
	return strings.Join([]string{string(r[:index]), string(rune(' ')), string(r[index:])}, "")
}
