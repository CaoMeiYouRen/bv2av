# 算法来源
# 作者：mcfx
# 链接：https://www.zhihu.com/question/381784377/answer/1099438784
# 来源：知乎
# 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
tr = {}
for i in range(58):
    tr[table[i]] = i
s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7]
xor = 177451812
add = 100618342136696320


def dec(x):
    r = 0
    for i in range(10):
        r += tr[x[s[i]]]*58**i
    return (r-add) ^ xor


def enc(x):
    x = (x ^ xor)+add
    r = list('BV          ')
    for i in range(10):
        r[s[i]] = table[x//58**i % 58]
    return ''.join(r)


print(dec('BV17x411w7KC'))
print(dec('BV1Q541167Qg'))
print(dec('BV1mK4y1C7Bz'))
print(enc(170001))
print(enc(455017605))
print(enc(882584971))
