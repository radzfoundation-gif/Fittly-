
with open('/run/media/radea/DATA/fitverse/landing-pages/src/app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

balance = 0
history = []
for i, line in enumerate(lines):
    for char in line:
        if char == '{':
            balance += 1
            history.append((i+1, char))
        elif char == '}':
            balance -= 1
            if history: history.pop()
    if i > 970:
        print(f"Line {i+1}: {history}")
