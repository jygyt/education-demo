接口 启用

id: 336
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "ubus", "call",…]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "ubus"
2: "call"
3: {object: "network.interface.docker", method: "up"}
method: "up"
object: "network.interface.docker"


接口停止
id: 363
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "ubus", "call",…]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "ubus"
2: "call"
3: {object: "network.interface.docker", method: "down"}
method: "down"
object: "network.interface.docker"

接口 编辑
id: 19
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "load", {config: "network"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "load"
3: {config: "network"}

接口增加
id: 66
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "add",…]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "add"
3: {config: "network", values: {}, type: "interface", name: "1111111"}
config: "network"
name: "1111111"
type: "interface"
values: {}

接口删除
id: 90
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "delete", {config: "network", section: "1111111"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "delete"
3: {config: "network", section: "1111111"}
config: "network"
section: "1111111"


主机名添加
id: 22
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "add",…]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "add"
3: {config: "dhcp", values: {key: 0, name: "111", ip: "111.111.111.111"}, type: "domain"}
config: "dhcp"
type: "domain"
values: {key: 0, name: "111", ip: "111.111.111.111"}
ip: "111.111.111.111"
key: 0
name: "111"

主机名保存和应用
id: 23
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "apply", {}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "apply"
3: {}


主机名查询
id: 54
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "load", {config: "dhcp"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "load"
3: {config: "dhcp"}
config: "dhcp"

主机名应用
id: 55
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "system", "init_action", {name: "dnsmasq", action: "restart"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "system"
2: "init_action"
3: {name: "dnsmasq", action: "restart"}
action: "restart"
name: "dnsmasq"

主机名删除
id: 63
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "uci", "delete", {config: "dhcp", section: "cfg05f37d"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "uci"
2: "delete"
3: {config: "dhcp", section: "cfg05f37d"}
config: "dhcp"
section: "cfg05f37d"

网络诊断
ipv4ping
id: 90
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "diagnose", "ping", {args: "-c 5 -W 1 openwrt.org"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "diagnose"
2: "ping"
3: {args: "-c 5 -W 1 openwrt.org"}
args: "-c 5 -W 1 openwrt.org"
网络诊断
ipv4T
id: 96
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "diagnose", "traceroute", {args: "-q 1 -w 1 -n openwrt.org"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "diagnose"
2: "traceroute"
3: {args: "-q 1 -w 1 -n openwrt.org"}
args: "-q 1 -w 1 -n openwrt.org"
网络诊断
ipv6p
id: 14
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "diagnose", "ping6", {args: "-c 5 -W 1 openwrt.org"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "diagnose"
2: "ping6"
3: {args: "-c 5 -W 1 openwrt.org"}
args: "-c 5 -W 1 openwrt.org"

网络诊断
ipv6T
id: 18
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "diagnose", "traceroute6", {args: "-q 1 -w 2 -n openwrt.org"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "diagnose"
2: "traceroute6"
3: {args: "-q 1 -w 2 -n openwrt.org"}
args: "-q 1 -w 2 -n openwrt.org"


网络诊断
DNS
id: 20
jsonrpc: "2.0"
method: "call"
params: ["594cc2ab2c1d74f0b4666b0335320f20", "diagnose", "nslookup", {args: "openwrt.org"}]
0: "594cc2ab2c1d74f0b4666b0335320f20"
1: "diagnose"
2: "nslookup"
3: {args: "openwrt.org"}
args: "openwrt.org"



防火墙初始化
id: 357
jsonrpc: "2.0"
method: "call"
params: ["46d80ba1280a0569789fb7bc7101b9f4", "uci", "load", {config: "firewall"}]
0: "46d80ba1280a0569789fb7bc7101b9f4"
1: "uci"
2: "load"
3: {config: "firewall"}

基本设置 .type: "defaults"

区域 .type: "zone"

通讯规则 .type: "rule"

区域
id: 56
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "add", {config: "firewall",…}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "add"
3: {config: "firewall",…}
config: "firewall"
type: "zone"
values: {key: 3, masq: "1", mtu_fix: "1", network: ["ceshi"], family: [""], log: "1"}
family: [""]
key: 3
log: "1"
masq: "1"
mtu_fix: "1"
network: ["ceshi"]


id: 14
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "delete", {config: "firewall", section: "cfg0fdc81"}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "delete"
3: {config: "firewall", section: "cfg0fdc81"}
config: "firewall"
section: "cfg0fdc81"


路由
ip4
id: 364
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "add", {config: "network",…}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "add"
3: {config: "network",…}
config: "network"
type: "route"
values: {key: 0, interface: "77777", target: "192.168.182.1", netmask: "255.255.255.0",…}
gateway: "192.168.182.1"
interface: "77777"
key: 0
metric: "254"
mtu: "1500"
netmask: "255.255.255.0"
target: "192.168.182.1"

id: 366
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "load", {config: "network"}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "load"
3: {config: "network"}
config: "network"

ip6
id: 372
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "add", {config: "network",…}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "add"
3: {config: "network",…}
config: "network"
type: "route6"
values: {key: 0, interface: "ceshi", target: "1231231", gateway: "312312312", metric: "2", mtu: "1500"}
gateway: "312312312"
interface: "ceshi"
key: 0
metric: "2"
mtu: "1500"
target: "1231231"
删除
{jsonrpc: "2.0", id: 379, method: "call",…}
id: 379
jsonrpc: "2.0"
method: "call"
params: ["f8125b3726ec5a903383a8e08dd4d637", "uci", "delete", {config: "network", section: "cfg10df6a"}]
0: "f8125b3726ec5a903383a8e08dd4d637"
1: "uci"
2: "delete"
3: {config: "network", section: "cfg10df6a"}
config: "network"
section: "cfg10df6a"


dhcp
id: 33
jsonrpc: "2.0"
method: "call"
params: ["845acf7f646f7e681ae0e2b7b9ce69a2", "uci", "load", {config: "dhcp"}]
0: "845acf7f646f7e681ae0e2b7b9ce69a2"
1: "uci"
2: "load"
3: {config: "dhcp"}
config: "dhcp"



jsonrpc: "2.0"
method: "call"
params: ["3117ca7472805369505a54107c0d0523", "ubus", "call", {object: "network.interface", method: "dump"}]
0: "3117ca7472805369505a54107c0d0523"
1: "ubus"
2: "call"
3: {object: "network.interface", method: "dump"}
method: "dump"
object: "network.interface"


id: 26
jsonrpc: "2.0"
method: "call"
params: ["3117ca7472805369505a54107c0d0523", "ubus", "call", {object: "network.device", method: "status"}]
0: "3117ca7472805369505a54107c0d0523"
1: "ubus"
2: "call"
3: {object: "network.device", method: "status"}
method: "status"
object: "network.device"







