# JVM Monitoring tools

## Show All JVM Process

### Command

```shell
jcmd
```

### Output

```text
94577 org.elasticsearch.bootstrap.Elasticsearch --daemonize --pidfile /opt/soa/sag1015/apigw/InternalDataStore/bin/elasticsearch.pid
27714 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 4 -configuration /opt/soa/sag1015/isogw/profiles/IS_default/configuration -service sagis1015 com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown --
38371 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 4 -configuration /opt/apigw/profiles/IS_default/configuration -service sagis1011 com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown --
12917 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 4 -configuration /opt/isogw/profiles/IS_default/configuration -service sagis1011 com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown
116948 dist/Proxy.jar 22_to_5503 5503 10.0.113.6 22 false UTF-8 0
32917 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 4 -configuration /opt/soa/sag1015/apigw/profiles/IS_default/configuration -service sagis1015 com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown --
111175 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 2 -configuration /opt/soa/sag1015/apigw/profiles/SPM/configuration com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown --
27384 org.tanukisoftware.wrapper.WrapperStartStopApp org.eclipse.equinox.launcher.Main 2 -configuration /opt/soa/sag1015/isogw/profiles/SPM/configuration com.softwareag.platform.bootstrap.Bootstrap FALSE 1 shutdown --
105262 jdk.jcmd/sun.tools.jcmd.JCmd
```

## Show JVM Process Dump Support

### Command

```shell
jcmd <pid> help
```

### Output

```text
94577:
The following commands are available:
Compiler.CodeHeap_Analytics
Compiler.codecache
Compiler.codelist
Compiler.directives_add
Compiler.directives_clear
Compiler.directives_print
Compiler.directives_remove
Compiler.perfmap
Compiler.queue
GC.class_histogram
GC.finalizer_info
GC.heap_dump
GC.heap_info
GC.run
GC.run_finalization
JFR.check
JFR.configure
JFR.dump
JFR.start
JFR.stop
JVMTI.agent_load
JVMTI.data_dump
ManagementAgent.start
ManagementAgent.start_local
ManagementAgent.status
ManagementAgent.stop
System.trim_native_heap
Thread.print
VM.cds
VM.class_hierarchy
VM.classloader_stats
VM.classloaders
VM.command_line
VM.dynlibs
VM.events
VM.flags
VM.info
VM.log
VM.metaspace
VM.native_memory
VM.print_touched_methods
VM.set_flag
VM.stringtable
VM.symboltable
VM.system_properties
VM.systemdictionary
VM.uptime
VM.version
```

## Dump Process JVM

### Command

```shell
jcmd <pid> Thread.print | less -S
```

### Output

LESS