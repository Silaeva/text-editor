import { observer } from "mobx-react";
import { TreeEntity, TreeEntityType } from "interfaces";

import styles from "./FileExplorer.module.scss";
import { Entity } from "components/Entity/Entity";

const FileExplorer: React.FC= observer(() => {
    // const { treeEntities } = treeStore;

    const mockTreeEntities: Record<string, TreeEntity> = {
        "dsfgsdfc435236": {
            type: TreeEntityType.FOLDER,
            name: "first folder",
            contentList: { "sdgfscfw45645y7u876":  { name: "some file", type: TreeEntityType.FILE, text: "some file text some file text some file text some file text some file text"}}
        },
        "dsfgsdfe5463ygfc435236": {
            type: TreeEntityType.FOLDER,
            name: "empty object folder",
            contentList: {},
        },
        "dsfg765463ygfc435236": {
            type: TreeEntityType.FOLDER,
            name: "no content folder",
        },
        "dsfgsdfcwefwefrwe435236": {
            type: TreeEntityType.FOLDER,
            name: "second folder",
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {
                                "sdgfssdg4678098765876":  {
                                    name: "some inner folder",
                                    type: TreeEntityType.FOLDER,
                                    contentList: {
                                        "sdgfssdg4678645y7u876":  {
                                            name: "some second file",
                                            type: TreeEntityType.FILE,
                                            text: "second some file text some file text some file text some file text some file text",
                                        },
                                        "sdgfssdg4678098765876":  {
                                            name: "some inner folder",
                                            type: TreeEntityType.FOLDER,
                                            contentList: {},
                                        }
                                    },
                                },
                                "sdgfssdg4678645y7u876":  {
                                    name: "some second file",
                                    type: TreeEntityType.FILE,
                                    text: "second some file text some file text some file text some file text some file text",
                                },

                            },
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            }
        },
        "sdgfssdg4678098765876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghjhgfdrfss6780fgdhtn5876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghjhgf-plp;l,lm76":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghj;.m,[]76":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdnm,p5876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssgh.;tn5876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghjhgfdrp-l,6":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghjhgfdrfnnmtyn80fgdhtn5876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssgfhjk76":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },
        "sdgfssghjhlmkfgdhtn5876":  {
            name: "some inner folder",
            type: TreeEntityType.FOLDER,
            contentList: {
                "sdgfssdg4678098765876":  {
                    name: "some inner folder",
                    type: TreeEntityType.FOLDER,
                    contentList: {
                        "sdgfssdg4678645y7u876":  {
                            name: "some second file",
                            type: TreeEntityType.FILE,
                            text: "second some file text some file text some file text some file text some file text",
                        },
                        "sdgfssdg4678098765876":  {
                            name: "some inner folder",
                            type: TreeEntityType.FOLDER,
                            contentList: {},
                        }
                    },
                },
                "sdgfssdg4678645y7u876":  {
                    name: "some second file",
                    type: TreeEntityType.FILE,
                    text: "second some file text some file text some file text some file text some file text",
                },

            },
        },

    }

    const treeEntities = mockTreeEntities;

    return (
        <div className={styles.container}>
            {Object.entries(treeEntities).map(([entityId, entity]) => {
                return (
                    <Entity
                        key={entityId}
                        entityId={entityId}
                        entity={entity}
                    />
                )
            })}
        </div>
    );
});

export { FileExplorer };
