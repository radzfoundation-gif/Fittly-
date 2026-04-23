
with open('/run/media/radea/DATA/fitverse/landing-pages/src/app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

balance = 0
for i, line in enumerate(lines):
    for char in line:
        if char == '{': balance += 1
        elif char == '}': balance -= 1
    if i > 970:
        print(f"Line {i+1}: {balance}")
