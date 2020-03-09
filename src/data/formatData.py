filename = 'data.txt'

try:
    file = open(filename, 'r')
    for line in file:
        line_len = len(line)
        start = 1
        counter = 0
        while start < line_len:
            end = line.find(']', start) + 1
            if end:
                subline = line[start: end]
                start = end + 1
                start_text = subline.find('"') + 1
                end_text = subline.rfind('"')
                textdata = subline[start_text: end_text]
                replaced_textdata = textdata.replace('"', '\\' + '"')
                replaced_subline = subline.replace(textdata, replaced_textdata)
                line = line.replace(subline, replaced_subline)
                counter += 1
                print(counter)
            else:
                break
        file.close()
        file = open(filename, 'w')
        file.write(line)
        file.close()
finally:
    file.close()
