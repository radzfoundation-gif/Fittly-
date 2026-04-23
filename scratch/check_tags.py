
import re

with open('/run/media/radea/DATA/fitverse/landing-pages/src/app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Find tags in line
    tags = re.findall(r'<(div|/div|section|/section|main|/main|aside|/aside|nav|/nav|button|/button)', line)
    for tag in tags:
        if tag.startswith('/'):
            t = tag[1:]
            if not stack:
                print(f"Error: unexpected closing tag </{t}> at line {i+1}")
            else:
                opening, line_num = stack.pop()
                if opening != t:
                    print(f"Error: mismatch <{opening}> (line {line_num}) closed by </{t}> at line {i+1}")
        else:
            stack.append((tag, i+1))

if stack:
    for t, l in stack:
        print(f"Error: unclosed tag <{t}> at line {l}")
