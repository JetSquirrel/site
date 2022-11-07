---
title: "Informer Deltafifo 源码解读"
date: 2022/05/19
draft: false
categories:
- 云原生
tag: K8s

---

在 Informer开始运行时，`Reflector` 对象的 `store` 字段被设置为了 [DeltaFIFO 队列对象](https://github.com/kubernetes/client-go/blob/v0.18.6/tools/cache/shared_informer.go#L336-L378)

DeltaFIFO的结构定义的[源代码](https://github.com/kubernetes/client-go/blob/v0.18.6/tools/cache/delta_fifo.go#L158-L192)如下：

```go
type DeltaFIFO struct {
    // lock/cond protects access to 'items' and 'queue'.
    lock sync.RWMutex
    cond sync.Cond

    // We depend on the property that items in the set are in
    // the queue and vice versa, and that all Deltas in this
    // map have at least one Delta.
    items map[string]Deltas
    queue []string

    // a lot of code here
}
```

DeltaFIFO可以本

可以看到 ["DeltaFIFO"](siyuan://blocks/20220509122523-zsk961s)可以拆分开分为两个部分来理解 \[["1"](siyuan://blocks/20220509115438-pbyetvk)\]

- Delta：用于保存资源消费类型的资源对象存储
- FIFO：一个字符串队列

其中Deltas的键值对，其[源代码](http://127.0.0.1:6806/%5B\*%5D(https://github.com/kubernetes/client-go/blob/v0.18.6/tools/cache/delta_fifo.go#L675-L683))如下：

```go
// Deltas is a list of one or more 'Delta's to an individual object.
// The oldest delta is at index 0, the newest delta is the last one.
type Deltas []Delta

// Delta is the type stored by a DeltaFIFO. It tells you what change
// happened, and the object's state after* that change.
//
// [*] Unless the change is a deletion, and then you'll get the final
//     state of the object before it was deleted.
type Delta struct {
    Type   DeltaType
    Object interface{}
}
```

`DeltaType` 就是 Delta 的类型，有 [Added、Updated、Deleted、Replaced、Sync ](https://github.com/kubernetes/client-go/blob/v0.18.6/tools/cache/delta_fifo.go#L656-L673)这么几种，其作用是表示Kuberenets资源对象发生了何种变化。

[Kubernetes                     Informer           (举报人)                   - DeltaFIFO Queue 篇 · 风与云原生 (crazytaxii.com)](https://blog.crazytaxii.com/posts/k8s_client_go_informer2/)